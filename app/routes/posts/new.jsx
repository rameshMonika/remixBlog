import { Link, redirect } from "remix"

import {db} from '~/utils/db.server'

export const action = async ({request}) =>{
  const form =await request.formData()
  const title =form.get('title')
  const body =form.get('body') 

  const fields={title,body}

 console.log(fields)

 const post=await db.post.create({data:fields})

 return redirect(`/posts/${post.id}`)
    
}

function NewPost(){
    return(
    <>

     <div className="page-header">
       <h1>New Posts</h1>
       <Link to='/posts' className="btn btn-reverse">
         Back
       </Link>
     </div>

     <div className="page-container">
       <form method="POST">
         <div className="form-control">
           <label htmlFor="title">Title</label>
           <input type="text" name='title' id='title' />
         
         
         </div>
         <div className="form-control">
           <label htmlFor="body">Body</label>
           <textarea name='body' id='body' />
         
         
         </div>

         <button className="btn btn-block" type="submit" ></button>
       </form>
     </div>
  
   

      </>

    )
  }

  // export function ErrorBoundary({error}){
  //   console.log(error)
  //  return(
  //    <div>
  //      <h1>Error</h1>
  //      <p>{error.message}</p>
  //    </div>
  //  )
  // }
  
  export default NewPost