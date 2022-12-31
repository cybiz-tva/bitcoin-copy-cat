//"use strict";

const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
//const EC = require("elliptic").ec, ec = new EC("secp256k1");
//const MINT_PRIVATE_ADDRESS = "0700a1ad28a20e5b2a517c00242d3e25a88d84bf54dce9e1733e6096e6d6495e";
//const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, "hex");
//const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic("hex");

class Block {
    constructor(timestamp = Date.now().toString(), data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = "";
        this.hash = Block.getHash(this);
        //this.nonce = 0;
    }

    static getHash(block) {
        return SHA256(block.prevHash + block.timestamp + JSON.stringify(block.data) + block.nonce);
    }

    
}


class Blockchain {
    constructor() {
        this.chain = [new Block(Date.now().toString())];
       
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = Block.getHash(block);
        this.chain.push((block));

     }

    
} 

const Btcc = new Blockchain();
Btcc.addBlock(new Block(Date.now().toString(), ["Bitcoin Copy Cat", "First Block"]));
console.log(Btcc.chain);