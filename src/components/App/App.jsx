import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import { addItem, getItems, removeItem } from "../../utils/api";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [isWeatherDataLoading, setIsWeatherDataLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setActiveModal("mobile-menu");
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleConfirmationModal = () => {
    setActiveModal("modal-confirmation");
    setSelectedCard(selectedCard);
  };

  const handleCardDelete = () => {
    removeItem(selectedCard._id)
      .then(() => {
        const filteredItem = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(filteredItem);
        closeActiveModal();
        setSelectedCard(null);
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const cancelActiveModal = () => {
    setActiveModal("preview");
    setSelectedCard(selectedCard);
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleOverlayClose = (evt) => {
      if (evt.target.classList.contains("modal")) closeActiveModal();
    };
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleOverlayClose);
    };
  }, [activeModal]);

  useEffect(() => {
    setIsWeatherDataLoading(true);

    const fallbackCoordinates = { latitude: 32.615692, longitude: -83.633667 };

    const getUserCoordinates = () => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve(fallbackCoordinates);
          return;
        }

        const success = (pos) => {
          const { latitude, longitude } = pos.coords;
          resolve({ latitude, longitude });
        };

        const error = () => {
          resolve(fallbackCoordinates);
        };

        navigator.geolocation.getCurrentPosition(success, error, {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 60 * 1000,
        });
      });
    };

    getUserCoordinates()
      .then((coords) => getWeather(coords, apiKey))
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error)
      .finally(() => setIsWeatherDataLoading(false));

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoading={isWeatherDataLoading}
            mobileMenu={toggleMobileMenu}
            isMobileMenuOpened={isMobileMenuOpened}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  isLoading={isWeatherDataLoading}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddItemClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          activeModal={activeModal}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
          onDelete={handleCardDelete}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleConfirmationModal}
        />
        <ConfirmationModal
          isOpen={activeModal === "modal-confirmation"}
          activeModal={activeModal}
          onClose={closeActiveModal}
          onDelete={handleCardDelete}
          onCancel={cancelActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
