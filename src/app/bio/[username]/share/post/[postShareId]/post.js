'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ref as sRef, getBytes } from 'firebase/storage';
import { fbdb, fbStorage } from '../../../../../../common/utils/firebase';
import {
  ref,
  query,
  onValue,
  orderByChild,
  startAt,
  endAt
} from 'firebase/database';
import { Spin, Button } from 'antd';
import { BIO } from '../../../../../../common/constants';

const Post = () => {
  const [postLoaded, setPostLoaded] = useState(false);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState(undefined);
  const [audio, setAudio] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState({ id: '', audio: undefined });
  const pathname = usePathname();
  const path = pathname.slice(pathname.lastIndexOf('/') , pathname.length).replace('/','');
  const data = JSON.parse(atob(path));
  const userId = data.userId;
  const postId = data.postId;

  const downloadAndPlayAudio = (id, audio) => {
    const downloadRef = sRef(fbStorage, audio);
    getBytes(downloadRef).then((arrayBuffer) => {
      const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });
      const blobUrlObj = URL.createObjectURL(blob);
      playAudio({
        id: id,
        blobUrl: blobUrlObj
      });
    });
  }

  const playAudio = (item) => {
    if (isPlaying.id !== item.id) {

      if (isPlaying.audio && !isPlaying.audio.paused) {
        isPlaying.audio.pause();
      }

      const audio = new Audio(item.blobUrl);
      audio.play();
      setIsPlaying({
        id: item.id,
        audio: audio
      });

      audio.addEventListener('ended', function(){
        audio.currentTime = 0;
        setIsPlaying({ id: '', audio: undefined });
      });

    }
    if (isPlaying.id === item.id) {
      isPlaying.audio.pause();
      setIsPlaying({
        id: '',
        audio: undefined
      });
    }
  }

  const renderPhotosV2 = () => {
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/flipbio-1712c.appspot.com/o/';
    if (photos) {
      const keys = Object.keys(photos);
      const photoCount = Object.keys(photos).length;
      const query = '?alt=media';
      for (let i in photos) {
        new Image().src=`${baseUrl}${encodeURIComponent(photos[i])}${query}`
      }
      if (photoCount === 1) {
        return (
          <div className="row" style={{
            margin: '0 0 15px 0'
          }}>
            <div className="col-12">
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                width: '100%',
                height: '425px',
                position: 'relative',
                borderRadius: '15px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[0]])}${query}')`
              }}>
              </div>
            </div>
          </div>)
      }
      if (photoCount === 2) {
        return (
          <div className="row" style={{
            margin: '0 0 15px 0'
          }}>
            <div className="col-6">
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                width: '100%',
                height: '425px',
                position: 'relative',
                borderRadius: '15px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[0]])}${query}')`
              }}>
              </div>
            </div>
            <div className="col-6">
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                width: '100%',
                height: '425px',
                position: 'relative',
                margin: '0 0 25px 0',
                borderRadius: '15px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[1]])}${query}')`
              }}>
              </div>
            </div>
          </div>)
      }
      if (photoCount === 3) {
        return (
          <div className="row" style={{
            margin: '0 0 15px 0'
          }}>
            <div className="col-6">
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                width: '100%',
                height: '425px',
                position: 'relative',
                borderRadius: '15px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[0]])}${query}')`
              }}>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    width: '100%',
                    height: '250px',
                    position: 'relative',
                    margin: '0 0 25px 0',
                    borderRadius: '15px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[1]])}${query}')`
                  }}>
                  </div>
                </div>
                <div className="col-12">
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    width: '100%',
                    height: '150px',
                    position: 'relative',
                    borderRadius: '15px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[2]])}${query}')`
                  }}>
                  </div>
                </div>
              </div>
            </div>
          </div>)
      }
      if (photoCount === 4) {
        return (
          <div className="row" style={{
            margin: '0 0 15px 0'
          }}>
            <div className="col-6">
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                width: '100%',
                height: '425px',
                position: 'relative',
                borderRadius: '15px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[0]])}${query}')`
              }}>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    width: '100%',
                    height: '250px',
                    position: 'relative',
                    margin: '0 0 25px 0',
                    borderRadius: '15px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[1]])}${query}')`
                  }}>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    width: '100%',
                    height: '150px',
                    position: 'relative',
                    borderRadius: '15px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[2]])}${query}')`
                  }}>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    width: '100%',
                    height: '150px',
                    position: 'relative',
                    borderRadius: '15px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url('${baseUrl}${encodeURIComponent(photos[keys[3]])}${query}')`
                  }}>
                  </div>
                </div>
              </div>
            </div>
          </div>)
      }
    }
  }

  const getBaseUrl = () => {
    const pathname = window.location.pathname;
    let username;
    if (pathname && pathname.indexOf('/bio') > -1) {
      username = pathname.split('/');
      username = username.filter(function(str) {
        return /\S/.test(str);
      });
      return `https://flipbio.co/bio/${username[1]}`;
    }
  }

  useEffect(() => {
    if (!postLoaded) {
      const postRef = ref(fbdb, `${BIO}/${userId}/post/`);
      const q = query(postRef, orderByChild('public'), startAt(true, postId), endAt(true, postId));
      onValue(q, (snapshot) => {
        if (snapshot.val() !== null) {
          const key = Object.keys(snapshot.val())[0];
          const postItem = snapshot.val();
          if (postItem[key].audio) {
            setAudio(postItem[key].audio);
          }
          setDescription(postItem[key].body);
          if (postItem[key].photos) {
            setPhotos(postItem[key].photos);
          }
        }
        setPostLoaded(true);
      });
    }
  },[postLoaded]);

  return (
    <div className="container-xxl main-container">
      <div className="table-responsive">
        <div className="col-md-12">
          <div className="share-post">
            <h1 style={{
              margin: '0 0 15px 0'
            }}>FlipBio</h1>
            {postLoaded && (
              <div>
                <p>
                  {description}
                </p>
                {photos && renderPhotosV2()}
              </div>
            )}
            {!postLoaded && (
              <Spin />
            )}
            {audio && (
              <Button type="primary" onClick={() => downloadAndPlayAudio(postId, audio)} size="small" ghost style={{
                margin: '0 5px 0 0',
                border: '1px solid rgba(23, 42, 58, 0.7)',
                color: 'rgba(23, 42, 58, 0.7)'
              }}>listen</Button>
            )}
            {postLoaded && (
              <div className="text-center">
                <a href={getBaseUrl()} target="_blank" style={{
                  display: 'inline-block',
                  margin: '15px 0 0 0',
                  color: 'rgb(33, 37, 41)',
                  textDecoration: 'none'
                }}>{getBaseUrl()}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Post };