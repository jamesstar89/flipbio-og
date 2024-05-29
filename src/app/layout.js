import { headers } from 'next/headers';
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

export default async function RootLayout({children}) {

  const headerList = headers();
  const pathname = headerList.get('x-current-path');

  const getMetaData = async () => {
    const postUrl = `https://share.flipbio.co${pathname}`;
    let path;
    let data;
    let userId;
    let postId;
    let description;
    let photos;
    if (pathname && pathname.indexOf('/bio') > -1) {
      path = pathname.slice(pathname.lastIndexOf('/') , pathname.length).replace('/','');
      data = JSON.parse(atob(path));
      userId = data.userId;
      postId = data.postId;
    }
    
    if (userId) {
      const postRef = ref(fbdb, `${BIO}/${userId}/post/`);
      const q = query(postRef, orderByChild('public'), startAt(true, postId), endAt(true, postId));
      return await new Promise(resolve => {
        onValue(q, (snapshot) => {
          if (snapshot.val() !== null) {
            const key = Object.keys(snapshot.val())[0];
            const postItem = snapshot.val();
            description = postItem[key].body;
  
            const newModel = {
              description,
              postUrl
            };
  
            if (postItem[key].photos) {
              photos = postItem[key].photos;
            }
  
            if (Object.keys(photos).length > 0) {
              const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/flipbio-1712c.appspot.com/o/';
              const query = '?alt=media';
              newModel.photos = `${baseUrl}${encodeURIComponent(photos[Object.keys(photos)[0]])}${query}`;
            }

            resolve(newModel)
          }
        });
      })
    }
  }

  const newMetaSchema = await getMetaData();

  return (
    <>
      <html lang="en">
        <head>
          <>
            <title>FlipBio: Sharing made easy...</title>
            <meta property="og:title" content="FlipBio: Sharing made easy..."/>
            <meta property="og:logo" content="https://www.flipbio.co/flipbio-logo-square.png" />
            <meta property="og:description" content={newMetaSchema && newMetaSchema.description || 'FlipBio: Sharing made easy...'}/>
            <meta property="og:url" content={newMetaSchema && newMetaSchema.postUrl || 'https://flipbio.co'}/>
            <meta property="og:site_name" content="FlipBio"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:image" content={newMetaSchema && newMetaSchema.photos || 'https://www.flipbio.co/flipbio-logo-square.png'}/>
            <meta property="og:image:alt" content="FlipBio: Sharing made easy"/>
            <meta property="og:type" content="article"/>
            <meta name="twitter:title" content="FlipBio"/>
            <meta name="twitter:description" content={newMetaSchema && newMetaSchema.description || 'FlipBio: Sharing made easy...'}/>
            <meta name="twitter:image" content={newMetaSchema && newMetaSchema.photos || 'https://www.flipbio.co/flipbio-logo-square.png'}/>
            <meta name="twitter:image:alt" content="FlipBio: Sharing made easy"/>
          </>
        </head>
        <body className="base-theme lucid-dream">
          <div>{pathname}</div>
          {children}
        </body>
      </html>
    </>
  );
}
