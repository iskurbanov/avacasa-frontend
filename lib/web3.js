import Web3 from 'web3'
import Planetary from './Marketplace.json'

const web3 = new Web3(Web3.givenProvider)

const contractAddress = "0x9eeEd75cb63Dd447522E8a17cd5115594734dE51"
const contract = new web3.eth.Contract(Planetary.abi, contractAddress)

export { web3, contract, contractAddress }