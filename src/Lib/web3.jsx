import { Transaction } from "@mysten/sui/transactions";
import init, {deserialize} from '@mysten/move-bytecode-template';
import url from '@mysten/move-bytecode-template/move_bytecode_template_bg.wasm?url';
import * as wasm from '@mysten/move-bytecode-template/move_bytecode_template';
import { toB64, fromB64 } from '@mysten/sui/utils';
import { bcs } from '@mysten/bcs';
import { type } from "@testing-library/user-event/dist/type";

const bytecode ="oRzrCwYAAAAKAQAIAggMAxQQBCQCBSYlB0tSCJ0BgAEGnQJZCvYCBQz7AiMAAwMEAQgCCQAAAgACAQcAAwICAAAGAAEAAQcFAQECAgoCAwABBAIIAAcIAgABCgIBCAEBCAAKCQADCgIKAgoCCgIIAQgBCAEHCAIDQ0FUBlN0cmluZwlUeENvbnRleHQDY2F0DGNvbm5lY3Rvcl92MwtkdW1teV9maWVsZARpbml0A25ldwZzdHJpbmcKdHhfY29udGV4dAR1dGY4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEhGX87Tgudh3yYmWoY6HqwLNLV8fRxqhNxYv3crvzV8DCOgDAAAAAAAACgIGBXNfc3VpCgIGBW5fc3VpCgIGBWRfc3VpCgIGBXVfc3VpCgILCm5vIHR3aXR0ZXIKAgsKbm8gd2Vic2l0ZQoCDAtubyB0ZWxlZ3JhbQACAQUBAAAAAAEPCwAHAAcBBwIHAwcEBwURAgcGEQIHBxECCwE4AAIA"
const bondingContract = "0xcffe7f54bfbccf43a6d7136ca6d7c0424328cd284279b66a3338e2961e9c94d2"
const MEME_CONFIG = "0x895d7fa9ce305bf6922e95477d442229a4a538936d0398104c39791e8e85f524"
const INITIAL_VERSION = 289579784

const setupByteCode = async() =>{
  try{
    await init("code.wasm");
  }catch(err){
  }
}

setupByteCode();

const tempID1 = (Math.random() * 1000).toFixed(0)
const tempID2 = (Math.random() * 1000).toFixed(0)
const tempID3 = (Math.random() * 1000).toFixed(0)

const token1 =  {
  "decimals": 9,
  "symbol": "SYMB",
  "name": "horse",
  "description": "0xFoundation",
  "supply": 10000,
  "tempID": `${tempID1}${tempID2}${tempID3}`,
  "icon": "https://amaranth-worthy-crocodile-444.mypinata.cloud/ipfs/bafybeicwrj4rv23h7dfcow3j5tsk6o4zkslosjil3hjb2dwig3knzehl3y",
  "twitter": "https://twitter.com",
  "website": "https://mad.com",
  "telegram": "https://telegram.com"
}
// https://amaranth-worthy-crocodile-444.mypinata.cloud/ipfs/bafybeicwrj4rv23h7dfcow3j5tsk6o4zkslosjil3hjb2dwig3knzehl3y
export const placeDevMath = async (percent) => {
  // const percent  = 1;
  const total_token_amount = 1000_000_000_000_000;
  const token_amount = (total_token_amount) * percent;
  const virtual_sui_amount = 1_500_000_000_000;
  const listing_fee = 1_000_000_000;
  const _y = 1_000_000_000_000_000;

  const required_sui = (((virtual_sui_amount) * (token_amount) / ((_y - token_amount))))

  // console.log("required_sui ", required_sui);

  const swap_fee_bps = 200;

  let fee_amount =  (((required_sui) * (swap_fee_bps) / 10000))
  // console.log("fee_amount ", fee_amount)

  const total_required_sui = listing_fee + required_sui + fee_amount;
  // console.log("total_required_sui ", total_required_sui.toFixed(0))
  // console.log("token_amount ", token_amount.toFixed(0))
  return [total_required_sui.toFixed(0), token_amount.toFixed(0)]    
}

const updateTemplate =  (tokenData) => {
  const encoder = new TextEncoder();
  const d = wasm.deserialize(fromB64(bytecode))
  // const d1 = wasm.deserialize(fromB64(bytecode11))
  d.address_identifiers[0] = "0000000000000000000000000000000000000000000000000000000000000000"
  const ddd = wasm.serialize(d)
  // console.log(d)

  let updated = wasm.update_identifiers(ddd, {
    CAT: tokenData.name.replaceAll(' ', '_').toUpperCase(),
    cat: tokenData.name.replaceAll(' ', '_'),
  });

  updated = wasm.update_constants(
      updated,
      bcs.u64().serialize(tokenData.tempID).toBytes(),
      bcs.u64().serialize(1000).toBytes(),
      'U64'
  );

  updated = wasm.update_constants(
      updated,
      bcs.vector(bcs.u8()).serialize(encoder.encode(tokenData.symbol.toUpperCase())).toBytes(),
      bcs.vector(bcs.u8()).serialize(encoder.encode('s_sui')).toBytes(),
      'Vector(U8)'
  );

  updated = wasm.update_constants(
      updated,
      bcs.vector(bcs.u8()).serialize(encoder.encode(tokenData.name)).toBytes(),
      bcs.vector(bcs.u8()).serialize(encoder.encode('n_sui')).toBytes(),
      'Vector(U8)'
  );

  updated = wasm.update_constants(
      updated,
      bcs.vector(bcs.u8()).serialize(encoder.encode(tokenData.description)).toBytes(),
      bcs.vector(bcs.u8()).serialize(encoder.encode('d_sui')).toBytes(),
      'Vector(U8)'
  );

  updated = wasm.update_constants(
      updated,
      bcs.vector(bcs.u8()).serialize(encoder.encode(tokenData.icon)).toBytes(),
      bcs.vector(bcs.u8()).serialize(encoder.encode('u_sui')).toBytes(),
      'Vector(U8)'
  );

  updated = wasm.update_constants(
    updated,
    bcs.vector(bcs.u8()).serialize(encoder.encode(tokenData.twitter)).toBytes(),
    bcs.vector(bcs.u8()).serialize(encoder.encode('no twitter')).toBytes(),
    'Vector(U8)'
  );

  updated = wasm.update_constants(
    updated,
    bcs.vector(bcs.u8()).serialize(encoder.encode(tokenData.website)).toBytes(),
    bcs.vector(bcs.u8()).serialize(encoder.encode('no website')).toBytes(),
    'Vector(U8)'
  );

  updated = wasm.update_constants(
    updated,
    bcs.vector(bcs.u8()).serialize(encoder.encode(tokenData.telegram)).toBytes(),
    bcs.vector(bcs.u8()).serialize(encoder.encode('no telegram')).toBytes(),
    'Vector(U8)'
  );

  return updated;
};

export const createCoinWeb3 = async (wallet, client, token) => {
    try{
      const walletAddress = wallet.account?.address;

      const [required_sui, dev_token_amount] = await placeDevMath(token?.percent); // 0.00001
      
      let cursor = null;
      localStorage.setItem("tempID", token.tempID);
      let tx = new Transaction();
      
      const [upgradeCap] = tx.publish({
        modules: [toB64(updateTemplate(token))],
        dependencies: ['0x1', '0x2', bondingContract],
      });
      tx.transferObjects([upgradeCap], "0x0");
  
      const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(required_sui)]);
      tx.moveCall({
        target: `${bondingContract}::meme::place_dev_order`,
        arguments: [
  
        tx.sharedObjectRef({
          initialSharedVersion: INITIAL_VERSION,
          mutable: true,
          objectId: MEME_CONFIG
        }),
        tx.pure.u64(token.tempID), coin, tx.pure.u64(dev_token_amount)],
      });
  
      const resData = await wallet.signAndExecuteTransaction({
        transaction: tx,
      },
      {
          execute: ({ bytes, signature }) => {
              return client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                    showRawEffects: true,
                    showObjectChanges: true,
                },
              });
          },
      }
      );
  
      const objectChanges = resData?.objectChanges;
      console.log(objectChanges)
      const publishedObject = objectChanges.filter((item)=> item?.type == "published");
      const connectorObject = objectChanges.filter((item)=> item?.objectType?.includes("connector_v3::ConnectorV3"));
      const treasuryCapObject = objectChanges.filter((item)=> item?.objectType?.includes("TreasuryCap"));
      const coinMetadataObject = objectChanges.filter((item)=> item?.objectType?.includes("CoinMetadata"));
  
      localStorage.setItem("publishedObject", JSON.stringify(publishedObject[0]))
      localStorage.setItem("connectorObject", JSON.stringify(connectorObject[0]))
      localStorage.setItem("treasuryCapObject", JSON.stringify(treasuryCapObject[0]))
      localStorage.setItem("coinMetadataObject", JSON.stringify(coinMetadataObject[0]))
  
      console.log("publishedObject success", publishedObject[0]);
      console.log("connectorObject success", connectorObject);
      console.log("treasuryCapObject success", treasuryCapObject);
      console.log("coinMetadataObject success", coinMetadataObject);
  
      console.log("signAndExecuteTransaction success", resData);
      localStorage.setItem("meme_step", 1)
      return true;
    }catch(err){
      console.log(err)
      return false;
    }
}

export const acceptDevOrderWeb3 = async (wallet, client, token) => {
  try{

    let tx = new Transaction();
  
    const memeConfig = tx.sharedObjectRef({
      initialSharedVersion: INITIAL_VERSION,
      mutable: true,
      objectId: MEME_CONFIG
    });
  
    const connectorObject = JSON.parse(localStorage.getItem("connectorObject"));
    const coinMetadataObject = JSON.parse(localStorage.getItem("coinMetadataObject"));
    const publishedObject = JSON.parse(localStorage.getItem("publishedObject"));

    // console.log("connectorObject ", connectorObject)
    // console.log("coinMetadataObject ", coinMetadataObject)
    // console.log("publishedObject ", publishedObject)
  
    const receiving = tx.receivingRef({
      objectId: connectorObject.objectId,
      digest: connectorObject.digest,
      version: connectorObject.version,
    });
  
    const coinMetadata = tx.objectRef({
      objectId: coinMetadataObject.objectId,
      digest: coinMetadataObject.digest,
      version: coinMetadataObject.version
    })
  
    const typeArguments = [`${publishedObject.packageId}::${token.name}::${token.name.toUpperCase()}`]
    tx.moveCall({
      target: `${bondingContract}::meme::accept_connector_v3`,
      arguments: [memeConfig, receiving, coinMetadata],
      typeArguments: typeArguments
    });
  
    const resData = await wallet.signAndExecuteTransaction({
        transaction: tx,
      },
      {
        execute: ({ bytes, signature }) => {
          return client.executeTransactionBlock({
            transactionBlock: bytes,
            signature,
            options: {
              showRawEffects: true,
              showObjectChanges: true,
            },
          });
        },
      }
    );
    console.log("signAndExecuteTransaction success", resData);
  
    const objectChanges = resData?.objectChanges;
    // console.log(objectChanges)
    const bondingCurve = objectChanges.filter((item)=> item?.type == "created" && item?.objectType.includes("BondingCurve"));
    localStorage.setItem("bondingCurve", JSON.stringify(bondingCurve));
    localStorage.setItem("tx", resData?.digest);
    localStorage.setItem("meme_step", 2)
    return true;
  }catch(err){
    console.log(err)
    return false; 
  }
}

export const buyMath = async (realCurve, sui_for_buy) => {
    try{
      // sui_amount, min_tokens_out, max_tokens_out
      // console.log("buy math ", realCurve)
      // console.log(realCurve?.data.content.fields.virtual_sui_amount + realCurve?.data.content.fields.sui_balance )
      let suiIn = sui_for_buy;        // Example input
      const fee = (((suiIn) * (200) / 10000))
      suiIn = suiIn - fee
      const totalSui = Number(realCurve?.data.content.fields.virtual_sui_amount) + Number(realCurve?.data.content.fields.sui_balance); 
      const tokenSupply = realCurve?.data.content.fields.token_balance;  //
      // console.log("totalSui ", totalSui)
      // console.log("tokenSupply ", tokenSupply)
      const out = (Number(suiIn) * Number(tokenSupply)) / (Number(totalSui) + Number(suiIn));
      // const fee = (((suiIn) * (200) / 10000))
      // console.log("fee ", fee) 
      // console.log("tokensOut ", out)
      return out
    }catch(err){
      return 0
    }
}

export const buyWeb3 = async (wallet, client, memeData, sui, _min_tokens) => {
  try{

    console.log("buying....", memeData, sui, _min_tokens);
    const sui_for_buy = (sui * Number(1000000000)).toFixed(0); //100000000;
    const min_tokens = (_min_tokens * Number(1000000)).toFixed(0); //65328849153; 
    const max_tokens = (_min_tokens * 0.9).toFixed(0); // 1000000000; // slipage
  
    console.log(sui_for_buy, min_tokens, max_tokens)
    const walletAddress = wallet.account?.address;
  
    let tx = new Transaction();
    const bondingCurveObject = JSON.parse(memeData.bondingCurve);
    const publishedObject = JSON.parse(memeData.publishedObject);
    const token = JSON.parse(memeData.token);
  
    const curveConfig = tx.sharedObjectRef({
      initialSharedVersion: bondingCurveObject[0].owner.Shared.initial_shared_version,
      mutable: true,
      objectId: bondingCurveObject[0].objectId
    });
  
    const memeConfig = tx.sharedObjectRef({
      initialSharedVersion: INITIAL_VERSION,
      mutable: true,
      objectId: MEME_CONFIG
    });
  
    const typeArguments = [`${publishedObject.packageId}::${token.name}::${token.name.toUpperCase()}`]
    const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(sui_for_buy)]);
  
    tx.moveCall({
      target: `${bondingContract}::meme::buy`,
      arguments: [curveConfig, memeConfig, coin, tx.pure.u64(min_tokens), tx.pure.u64(max_tokens), tx.pure.address(walletAddress)],
      typeArguments: typeArguments
    });
  
    const resData = await wallet.signAndExecuteTransaction({
      transaction: tx,
    },
    {
      execute: ({ bytes, signature }) => {
        console.log("signature ", signature);
        return client.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: {
            showRawEffects: true,
            showObjectChanges: true,
          },
        });
      },
    }
    );

    localStorage.setItem("tx", resData?.digest);

    // console.log("signAndExecuteTransaction success", resData?.digest);
    // console.log("signAndExecuteTransaction success", resData);
    return true;
  }catch(err){
    console.log(err)
    return false
  }
}

export const sellMath =async (realCurve, sell_token_amount) => {
  console.log("selling ")
  // const sell_token_amount = 10000000;

  const tokenSupply = Number(realCurve?.data.content.fields.token_balance); 
  const totalSui = Number(realCurve?.data.content.fields.virtual_sui_amount) + Number(realCurve?.data.content.fields.sui_balance); 

  let sui_out =  (((sell_token_amount) * (totalSui) / ((tokenSupply) + (sell_token_amount))));
  console.log("sui out ", sui_out);

  const tmp = (((Number(sui_out)) * (200) / 10000));
  sui_out = sui_out - tmp;
  
  // console.log("sui out ", sui_out);

  return [sell_token_amount.toFixed(0), sui_out.toFixed(0)];
}

export const sellWeb3 = async (wallet, client, memeData, sell_token, min_sui) => {
  try{
    const walletAddress = wallet.account?.address;
    console.log("selling..");
  
    // const [sell_token, min_sui] = await sellMath({});
    console.log("sell_token ", sell_token, " min_sui ", min_sui);
  
    const objects = await client.getOwnedObjects({
      owner: wallet.account?.address,
      options: { showType: true },
      // cursor,
    });
    console.log("objects ", objects);
      
    let tx = new Transaction();
  
    const bondingCurveObject = JSON.parse(memeData.bondingCurve);
    const publishedObject = JSON.parse(memeData.publishedObject);
    const token = JSON.parse(memeData.token);
  
    const curveConfig = tx.sharedObjectRef({
      initialSharedVersion: bondingCurveObject[0].owner.Shared.initial_shared_version,
      mutable: true,
      objectId: bondingCurveObject[0].objectId,
    });
  
    const memeConfig = tx.sharedObjectRef({
      initialSharedVersion: INITIAL_VERSION,
      mutable: true,
      objectId: MEME_CONFIG
    });
  
    const typeArguments = [`${publishedObject.packageId}::${token.name}::${token.name.toUpperCase()}`]
  
    let allCoins = [];
    let temp = await client.getAllCoins({
      owner: walletAddress?.toString(),
    });
    allCoins = temp.data;
  
    while (temp.hasNextPage) {
      temp = await client.getAllCoins({
        owner: walletAddress?.toString(),
        cursor: temp.nextCursor
      });
      console.log("temp ", temp)
      allCoins = [...allCoins, ...temp.data];
    }
    console.log("allCoins ", allCoins)
    const selectedCoin = allCoins.filter((item) => item.coinType == typeArguments[0])
    console.log("selectedCoin ", selectedCoin);
  
    let coin = selectedCoin[0];
    const [splitted] = tx.splitCoins(coin.coinObjectId, [
      sell_token,
    ]);
  
    tx.moveCall({
      target: `${bondingContract}::meme::sell`,
      arguments: [curveConfig, memeConfig, splitted, tx.pure.u64(min_sui)],
      typeArguments: typeArguments
    });
  
    const resData = await wallet.signAndExecuteTransaction({
      transaction: tx,
    },
    {
      execute: ({ bytes, signature }) => {
        return client.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: {
            showRawEffects: true,
            showObjectChanges: true,
          },
        });
      },
    });
    console.log("signAndExecuteTransaction success", resData);
    localStorage.setItem("tx", resData?.digest);
    return true;
  }catch(err) {
    console.log(err)
    return false;
  }
}
