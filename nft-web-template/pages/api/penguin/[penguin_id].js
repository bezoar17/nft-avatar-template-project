import item_attributes from '../../../eth_helpers/item_attributes';
import {Infura, Contract} from '../../../eth_helpers/infura';

export default async function handler(req, res) {
  let  { id } = req.query
  id = parseInt(id)

  const description = "<PLACEHOLDER>"
  const preview_image = "<PLACEHOLDER>"
  const item_name = "<PLACEHOLDER>"
  const already_minted = 70
  const hidden_ids = []

  let result = {
    "attributes": [{"trait_type":"Status", "value":"Hidden"}],
    "description": description,
    "image": preview_image,
    "name": `${item_name} #${id}`
  }

  // return hidden items traits
  if (hidden_ids.includes(id)) {
    res.status(200).json(result)
  }

  if (id < already_minted){
    result = {
        "attributes": item_attributes(id),
        "description": description,
        "image": `${process.env.IMG_CDN_URL}/${id}.png`,
        "name": `${item_name} #${id}`
      }
  }
  else {
    let minted_count = await Contract(Infura).methods.totalSupply().call();
    minted_count = parseInt(minted_count);

    if (id < minted_count ){
      result = {
        "attributes": item_attributes(id),
        "description": description,
        "image": `${process.env.IMG_CDN_URL}/${id}.png`,
        "name": `${item_name} #${id}`
      }
    }
  }

  res.status(200).json(result)
}
