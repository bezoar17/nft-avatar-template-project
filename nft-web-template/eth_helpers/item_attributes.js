const all_attributes = '<PLACEHOLDER>'
// {"0":{"Background":"Giraffe","Cheeks":"Yellow","Eyes":"Cat","Beak":"Bucktooth","Face":"Giraffe","Hat":"Giraffe Ears","Clothes":"Giraffe Costume"}}

export default function item_attributes(serial_no){
  let r = all_attributes[serial_no]

  return Object.keys(r).map((key) => { return { "trait_type": key, "value": r[key] }})
}