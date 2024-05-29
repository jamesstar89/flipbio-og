'use client'

import { fbdb } from '../common/utils/firebase';
import {
  ref,
  query,
  onValue,
  orderByChild,
  startAt,
  endAt
} from 'firebase/database';
import { BIO } from '../common/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/App.css';
import './styles/Base.css';
import './styles/themes/LucidDream.css';
import './styles/themes/PurpleRain.css';
import './styles/themes/Sandy.css';
import './styles/themes/Light.css';
import './styles/themes/Rosy.css';

// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

const setMetaData = async () => {
  const pathname = '';
  const postUrl = `https://share.flipbio.co${pathname}`;
  let path;
  let data;
  let userId;
  let postId;
  let description;
  let photos;
  if (pathname) {
    path = pathname.slice(pathname.lastIndexOf('/') , pathname.length).replace('/','');
    data = JSON.parse(atob(path));
    userId = data.userId;
    postId = data.postId;
  }
  
  if (userId) {
    const postRef = ref(fbdb, `${BIO}/${userId}/post/`);
    const q = query(postRef, orderByChild('public'), startAt(true, postId), endAt(true, postId));
    return onValue(q, (snapshot) => {
      if (snapshot.val() !== null) {
        const key = Object.keys(snapshot.val())[0];
        const postItem = snapshot.val();
        description = postItem[key].body;
        if (postItem[key].photos) {
          photos = postItem[key].photos;
        }
      }
      return {
        description
      }
    });
  }
  if (!userId) {
    return {
      description: 'FlipBio: Sharing made easy...'
    }
  }
}

const getMetaData = (params) => {
  console.log(123, params)
  const metadata = setMetaData();
  return (<>
    <title>Ghost</title>
    <meta property="og:title" content="Next.js1235544444777"/>
    <meta property="og:description" content="FlipBio: Sharing made easy..."/>
    <meta property="og:url" content="https://nextjs.org"/>
    <meta property="og:site_name" content="Next.js"/>
    <meta property="og:locale" content="en_US"/>
    <meta property="og:image" content="https://nextjs.org/og.png"/>
    <meta property="og:image:width" content="800"/>
    <meta property="og:image:height" content="600"/>
    <meta property="og:image" content="https://nextjs.org/og-alt.png"/>
    <meta property="og:image:width" content="1800"/>
    <meta property="og:image:height" content="1600"/>
    <meta property="og:image:alt" content="My custom alt"/>
    <meta property="og:type" content="website"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="Next.js"/>
    <meta name="twitter:description" content="FlipBio: Sharing made easy..."/>
    <meta name="twitter:image" content="https://nextjs.org/og.png"/>
    <meta name="twitter:image:width" content="800"/>
    <meta name="twitter:image:height" content="600"/>
    <meta name="twitter:image" content="https://nextjs.org/og-alt.png"/>
    <meta name="twitter:image:width" content="1800"/>
    <meta name="twitter:image:height" content="1600"/>
    <meta name="twitter:image:alt" content="My custom alt"/>
    </>)
};

export default function RootLayout(props) {
  console.log(555, props.params)
  const params = props.params;
  return (
    <>
      <html lang="en">
        <head>
          {getMetaData(params)}
        </head>
        <body className="base-theme lucid-dream">
          {props.children}
        </body>
      </html>
    </>
  );
}
