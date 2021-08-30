// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Infura, Contract} from '../../eth_helpers/infura';

export default async function handler(req, res) {
  var start = new Date().getTime();
  const minted_count = await Contract(Infura).methods.totalSupply().call();
  var end = new Date().getTime();

  res.status(200).json(
    {
      "count": minted_count,
      "time_taken": end - start
    }
  )
}
