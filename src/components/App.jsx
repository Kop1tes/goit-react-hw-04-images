import React, { useState, useEffect } from "react";
import * as API from "fetch/fetch";
import css from "./App.module.css";
import Searchbar from "./Searchbar/Searchbar"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import MyLoader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import { ToastContainer } from "react-toastify";

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setIsLoading(true);

    API.getImages(query, page).then(({ hits, totalHits }) => {
      if (hits.length) {
        setImages(images => [...images, ...hits]);
        setTotalImages(totalHits);
      }
    }).catch(error => setError({ error })).finally(() => {
      setIsLoading(false);
    });
  }, [query, page]);

  const onSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const openModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const toggleModal = () => {
    setIsShowModal(isShowModal => !isShowModal);
  };

  const ifLoadMore = () => {
    return totalImages - images.length > 12;
  };

  return (
    <div className={css.App}>
      <>
        <Searchbar onSubmit={onSearch} />
        {images.length !== 0 && (
          <>
            <ImageGallery openModal={openModal} images={images} />
            {ifLoadMore() && !isLoading && (
              <Button response={() => setPage(page => page + 1)} />
            )}
          </>
        )}
        {isLoading && <MyLoader />}

        {error && (
          <h1>Sorry, there are no images matching your search {tags}.</h1>
        )}
        {isShowModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </>
    </div>
  );
}

export default App;

// export class App extends Component {
//   state = {
//     page: 1,
//     query: "",
//     images: [],
//     error: "",
//     isLoading: false,
//     largeImageURL: '',
//     tags: "",
//     totalImages: 0,
//   }

//   async componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;

//     if (prevState.page !== this.state.page || prevState.query !== this.state.query) {
//       this.setState({ isLoading: true });
//       API.getImages(query, page)
//         .then(({ hits, totalHits }) => {
//         if (hits.length) {
//           return this.setState(prev => ({
//             images: [...prev.images, ...hits],
//             totalImages: totalHits,
//           }));
//         }
//         this.setState(prevState => ({
//           page: prevState.page + 1,
//         }));
//       })
//         .catch(error => this.setState({ error }))
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   loadMore = e => {
//     e.preventDefault();

//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
  
//   onSearch = query => {
//     this.setState({
//       query,
//       images: [],
//       page: 1,
//     });
//   };

//   openModal = largeImageURL => {
//     this.setState({ largeImageURL });
//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState(({ isShowModal }) => ({
//       isShowModal: !isShowModal,
//     }));
//   };

//   ifLoadMore = () => {
//     return this.state.totalImages - this.state.images.length > 12;
//   };

//   render() {
//     const { isLoading, images, isShowModal, largeImageURL, tags, error } = this.state;

//     return (
//         <div className={css.App}>
//           <>
//             <Searchbar onSubmit={this.onSearch} />
//             {images.length !== 0 && (
//             <>
//               <ImageGallery openModal={this.openModal} images={images} />
//               {this.ifLoadMore() && !isLoading && (
//                 <Button response={this.loadMore} />
//               )}
//             </>
//             )}
//             {isLoading && <MyLoader />}

//             {error && (
//               <h1>Sorry, there are no images matching your search {tags}.</h1>
//             )}
//             {isShowModal && (
//               <Modal onClose={this.toggleModal}>
//                 <img src={largeImageURL} alt={tags} />
//               </Modal>
//             )}
//             <ToastContainer autoClose={3000} />
//           </>
//         </div>
//     );
//   }
// }