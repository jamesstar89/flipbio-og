import { Post } from './post.js';

const Page = (props) => {
  const url = props.params;
  console.log(777, url)
  return (
    <>
      <Post/>
    </>
  )
}

export default Page;