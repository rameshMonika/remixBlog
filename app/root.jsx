
import { Outlet, LiveReload, Link,Links,Meta} from "remix";
import globalStylesUrl from '~/styles/global.css';

export const links = () =>[{
  rel:'stylesheet',href:globalStylesUrl
}]

export const meta =() =>{
  const description = 'a blog built with remix'
  const keywords ='remix,react,javascript'

  return{
    description,
    keywords
  }

}

export default function app() {
  return (
    <Document>
      <Layout>
      <Outlet />
      </Layout>
    
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>

        <meta charSet="utf-8"/>
        <meta name='viewport' content='width=device-width,initial-scale=1'/>

        <Links />
        <title>{title ? title : "My remix blog"}</title>
      </head>

      <body>
        {children}

        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to='/' className="logo">
          Remix
        </Link>
        <ul className="nav">
          <li>
            <Link to='/posts' className="logo">
              Posts
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container">
        {children}
      </div>
    </>
  );
}

export function ErrorBoundary({error}){
  console.log(error)
 return(
   <Document>
     <Layout>
     <h1>Error</h1>
     <p>{error.message}</p>

     </Layout>
    
   </Document>
 )
}
