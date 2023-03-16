import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import axios from "axios";

export const AllMedia = () => {
  const { id } = useParams();
  const [movieBackground, setMovieBackground] = useState();
  const [mediaArray, setMediaArray] = useState();
  const [mediaArrayImages, setMediaArrayImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  let mediaImages = [];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const movieInfoUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(movieInfoUrl).then((response) => {
      setMovieBackground(response.data);
    });
    const movieMediaUrl = `https://api.themoviedb.org/3/movie/${id}/images?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieMediaUrl).then((response) => {
      console.log(response.data.backdrops);
      setMediaArray(response.data.backdrops);
      response.data.backdrops.map((image) => {
        mediaImages.push(
          `https://image.tmdb.org/t/p/original${image.file_path}`
        );
      });
      setMediaArrayImages(mediaImages);
    });
  }, []);

  return (
    <div className="container">
      {movieBackground != null ? (
        <div
          className="poster-movie pointer"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movieBackground.backdrop_path}')`,
          }}
        >
          <h1 className="poster-movie-title">
            {movieBackground.original_title}
          </h1>
        </div>
      ) : (
        <></>
      )}
      <h2 className="detail" style={{ marginTop: 70 }}>
        Media
      </h2>
      <div className="movies-container wrapper" style={{ paddingTop: 0 }}>
        {mediaArray != null ? (
          mediaArray.map((image, index) => {
            return (
              <img
                className="pointer media-movie-img"
                onClick={() => openImageViewer(index)}
                key={index}
                style={{ marginTop: 50 }}
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                alt=""
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={mediaArrayImages}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
    </div>
  );
};
