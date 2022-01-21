const { assert } = require("chai");

const MemoryToken = artifacts.require("./contratcs/MemoryToken.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Memory Token", (accounts) => {
    let token;

    describe("deployment", async () => {
         it("deploys successfullly" , async () => {
              token = await MemoryToken.deployed();

              const address = token.address;

              assert.notEqual(address, 0x0);
              assert.notEqual(address, "");
              assert.notEqual(address, null);
              assert.notEqual(address, undefined);
         })

        it("has a name" , async () => {
            const name = await token.name();
            assert.equal(name, "Memory Token");
        })

        it("has a symbol" , async () => {
            const symbol = await token.symbol();
            assert.equal(symbol, "MTT");
        })

        it("mints tokens" , async () => {
            await token.mint(accounts[0], "https://www.token-uri.com/nft");
            result = await token.totalSupply();
            assert.equal(result.toString(), "1", "total supply is correct");

            result = await token.balanceOf(accounts[0]);
            assert.equal(result.toString(), "1", "balanceOf is correct");

            // Verifica se a nft foi para minha carteira
            result = await token.ownerOf("0");
            assert.equal(result.toString(), accounts[0].toString(), "ownerOf id correct");
            result = await token.tokenOfOwnerByIndex(accounts[0], 0);

            // Tras todos os tokens que tem na carteira

            let balanceOf = await token.balanceOf(accounts[0]);
            let tokenIds = [];

            for (let i = 0; i < balanceOf; i++) {
                let id = await token.tokenOfOwnerByIndex(accounts[0], i);
                tokenIds.push(id.toString());
            }

            let expected = ['0'];

            assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds ate correct');

            // Verifica se a nft esta armazenando a url correta da imagem
            let tokenURI = await token.tokenURI("0");
            assert.equal(tokenURI, "https://www.token-uri.com/nft", "ownerOf id correct");
        })
    }) 
})