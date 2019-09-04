const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./schema/schema");
const { getContract,getWallet,getProvider } = require("./contract/getContract");

let contractInstance = {};
getContract.then(res=>contractInstance=res);
let ethersWalletInstance =  getWallet();

async function getTransactionReceipt(transactionHash){
  let response =null;
  response = await getProvider().getTransactionReceipt(transactionHash);
  return response;
}
async function set_Greeter(message) {
  let response = null;
  let error = null;
  await contractInstance
        .setGreeter(message).then(res => (response = res)).catch(err => (error = err));
  await response.wait();
  response = await getTransactionReceipt(response.hash);
  return response;
}

// The resolvers
const resolvers = {
  Query: {
    async greet() {
      let message=contractInstance.greet();
      return {
        address: ethersWalletInstance.address,
        message
      };
    }
  },
  Mutation: {
    async setGreeter(obj, args, context) {
      let transactionHash = "";
      let blockHash = "";
      let blockNumber = 0;
      let gasUsed = 0;
      let status = false;

      const response = set_Greeter(args.message);
      await response
        .then(res => {
          transactionHash = res.transactionHash;
          blockHash = res.blockHash;
          blockNumber = res.blockNumber;
          gasUsed = res.gasUsed;
          status = res.status;
        })
        .catch(err => console.log(err));
      return {
        transactionHash,
        blockHash,
        blockNumber,
        gasUsed,
        status
      };
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});