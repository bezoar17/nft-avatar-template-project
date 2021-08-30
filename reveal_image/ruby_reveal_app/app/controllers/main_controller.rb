require 'azure/storage/blob'

class MainController < ApplicationController
  def index
    render json: ['It just works !!']
  end

  def get_total_minted
    '<PLACEHOLDER><max_mint_count>'
    10000
  end

  # gives ids which are valid to move
  def filtered_ids(ids)
    return [] if ids.nil?
    minted_val = get_total_minted
    baseline = ENV['BASELINE']&.to_i || -1
    begin
      ids.split(',').map(&:to_i).select { |e| e < minted_val && e > baseline }
    rescue StandardError => ex
      puts "[storage_account] Failed ID transform for #{ids}, error:#{ex}"
      []
    end
  end

  def move(id)
    begin
      blob_client.copy_blob('<PLACEHOLDER><container_name>', "#{id}.png", 'temp', "#{id}.png")
    rescue StandardError => ex
      puts "[storage_account] FAILED TO MOVE id:#{id}, error:#{ex}"
    end
  end

  def move_parallel_ids(ids)
    Process.fork do
      ids.each { |i| Process.fork { move(i) } }
      Process.waitall
    end
  end

  def move_thread_ids(ids)
    ids.map { |i|
      Thread.new { move(i) }
    }.each(&:join)
  end

  def reveal_till_now
    begin
      blob, content = blob_client.get_blob('<PLACEHOLDER><temp_container_name>', 'max_moved.txt')
      moved_till_now = content.to_i
      blob, content = blob_client.get_blob('<PLACEHOLDER><temp_container_name>', 'minted.txt')
      minted_till_now = content.to_i
      ids = ((moved_till_now+1)...minted_till_now).to_a

      move_parallel_ids(ids)

      blob_client.create_block_blob('<PLACEHOLDER><temp_container_name>', 'max_moved.txt', (ids + [moved_till_now]).max.to_s)
      puts "[storage_account] MOVED IDS:#{ids}"
      render json: {count: ids.size, success: ids, minted_till_now: minted_till_now, moved_till_now: moved_till_now}
    rescue StandardError => ex
      puts "[storage_account] FAILED IN ALL REVEAL, #{ex}"
    end
  end

  def reveal_image
    code = params[:code]
    if params[:code] != ENV['AZURE_MOVE_FN_CODE']
      puts "[storage_account] WRONG CODE PROVIDED FOR IDS:#{params[:ids]}"
      return render json: {error: "wrong code provided"}
    end
    ids = filtered_ids(params[:ids])
    return render json: {count: ids.size, ids: ids, raw_ids: params[:ids]} if ids.size == 0 || ids.size >50

    move_parallel_ids(ids)

    puts "[storage_account] MOVED IDS:#{ids}"
    render json: {count: ids.size, success: ids}
  end

  def blob_client
    ::Azure::Storage::Blob::BlobService.create(storage_account_name: '<PLACEHOLDER><storage_account_name>', storage_access_key: ENV['STORAGE_KEY'])
  end
end