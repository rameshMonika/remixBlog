// import {redirect, useLoaderData} from 'remix'

import { useParams ,useLoaderData} from 'remix'
import {db} from '~/utils/db.server'

export const loader = async ({params}) => {
    const post = await db.post.findUnique({
        where:{id: params.id}
       
    })
   

if(!post) throw new Error('post not found')

const data={post}
console.log(data)
return data

}

export const action= async ({request,params})=>{

    const form =await request.formData()
    if(form.get('_method')==='delete'){
        const post = await db.post.findUnique({
            where:{id: params.id},
        })

        if(!post) throw new Error('Post not found')


        await db.post.delete({where:{id:params.id}})

        return redirect('/posts')


    }

}


function Posts(){

    const {post}=useLoaderData()

    const params=useParams()

    console.log("------------------------------")
    console.log(post)


  
    return(
   <div>

       {/* <h1>Post {params.id}</h1>
       <h1>{post.title}</h1> */}
     

       <div className="page-header">
       <h1>{post.title}</h1>
       {/* <Link to='/posts' className='btn btn-reverse'>Back
       </Link> */}
       </div>
    <div className="page-content">
    <h3>{post.body}</h3>
    </div>

    <div className="page-footer">
        <form method='POST'>
            <input type='hidden' name='_method' value='delete'/>
            <button className='btn btn-delete'> Delete</button>
        </form>
    </div>
     
   </div>
    )
  }
  
  export default Posts