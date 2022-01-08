// import {redirect, useLoaderData} from 'remix'

import { useParams, useLoaderData } from "remix";
import { db } from "~/utils/db.server";


export const loader = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { id: params.id },
  });

  if (!post) throw new Error("post not found");

  const data = { post };
  console.log(data);
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const post = await db.post.findUnique({
      where: { id: params.id },
    });

    if (!post) throw new Error("Post not found");

    await db.post.delete({ where: { id: params.id } });

    return redirect("/posts");
  }

  if (form.get("_method") === "update") {
    const title = form.get("title");
    const body = form.get("body");
    const id=form.get("id")

    const fields={title,body}

    console.log(fields)
   


    console.log(title+" "+body+" "+id);

   

    await db.post.update({ where: {
        id: id
    },
    data: {
        title: title,
       body: body
    }});

    return redirect('/posts')
  }
};

function Posts() {
  const { post } = useLoaderData();

  const params = useParams();

  console.log("------------------------------");
  console.log(post);

  return (
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

      <div className="page-container">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" />
          </div>
          <input type="text" name="id" id="id" value={post.id}/>

          <input type="hidden" name="_method" value="update" />
          <button className="btn btn-delete"> edit</button>
        </form>
      </div>

      <div className="page-footer">
        <form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete"> Delete</button>
        </form>
      </div>
    </div>
  );
}

export default Posts;
