import express from 'express'
import ejs from 'ejs'

const app = express()


import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import db from './db.js'
import { typeDefs } from './schema.js';

app.set('view engine' , 'ejs')

const resolvers = {
    Query : {
        games(){
            return db.games
        },

        reviews(){
            return db.reviews
        },

        authors(){
            return db.authors
        },

        review(_,args){
            return db.reviews.find((review)=>review.id === args.id)
        },

        game(_, args){
            return db.games.find((game)=> game.id === args.id)
        },
        
        author(_,args){
            return db.authors.find((author)=>author.id === args.id)
        }
    },

  Games: {
    reviews(parent){
        return db.reviews.filter((review)=>review.game_id === parent.id)
    },
  },

  Author: {
    reviews(parent){
        return db.reviews.filter((review)=> review.author_id === parent.id)
    }
  }



}
const server = new ApolloServer({
    typeDefs,
    resolvers
})



const {url} =  startStandaloneServer(server,{
    listen: {port:4001}
})

app.get('/',(req,res)=>{
    res.render('client')
})


app.listen(3000)
console.log("apollo server is set and running");