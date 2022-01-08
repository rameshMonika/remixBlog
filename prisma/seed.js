const {PrsimaClient, PrismaClient} =require('@prisma/client')
const db =new PrismaClient();


async function seed(){
    await Promise.all(
        getPosts().map(post =>{
            return db.post.create({data:post})
        })
    )
}
seed()

function getPosts(){
    return[
        {
            title:'Javascript performance tip',
            body:'we will look at 10 tips of js'
        },
        {
            title:'Python performance tip',
            body:'we will look at 10 tips of python'
        },
        {
            title:'java performance tip',
            body:'we will look at 10 tips of java'
        },
    ]
}