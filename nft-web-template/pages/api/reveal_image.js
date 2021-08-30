import {Infura, Contract} from '../../eth_helpers/infura';

async function move_images(ids) {
    try {
        let url = new URL(process.env.AZURE_MOVE_FN)
        url.search = new URLSearchParams({ ids: ids.join(','), code: process.env.AZURE_MOVE_FN_CODE })
        return await fetch(url);
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export default async function handler(req, res) {
  var start = new Date().getTime();
  const minted_count = await Contract(Infura).methods.totalSupply().call();
  let { ids } = req.query

  ids = ids.split(',')

  if (Math.max(...ids) >= minted_count) {
    return res.status(200).json(
      {
        "error_id": Math.max(...ids),
        "result": "not minted yet"
      }
    )
  }

  var responses = await move_images(ids)
  var end = new Date().getTime();

  res.status(200).json(
    {
      "count": responses,
      "time_taken": end - start
    }
  )
}
