import React, { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import MobileDate from '../MobileComponent/MobileDate';
import { convertDatesToUTC } from '../../Utilis/_fuctions';
import { useAuthContext } from '../../context/userAuthContext';
import { useSearch } from '../../context/useSearch';
import { useCollections } from '../../context/useStateManager';
import GlobalModal from '../Global/GlobalModal';

const TravelMobileSearch = () => {

    const Stylelabel = {
        fontSize: "12px",
        lineHeight: "1.4375em",
        color: "rgba(0, 0, 0, 0.6)",
        marginBottom: "-17px",
        paddingBottom: "0px",
        fontWeight: "normal",
        position: "relative",
        top: "0px",
        left: "1%",
        textAlign: "left",
    };

    // to update the query search value
    const updateSearchQuery = async ({ ...args }) => {
        const updatedSearchParams = {
            ...currentSearchParams,
            ...args,
        };
        setSearchParams(new URLSearchParams(updatedSearchParams));
    };

    // update the rest location data here

    function valuetext(value) {
        return `${value}`;
    }

    // Handle the price change
    function handlePriceChange(event, newValue) {
        setPriceRange(newValue);
        updateSearchQuery({ priceMin: newValue[0], priceMax: newValue[1] });
    }

    // handle room increament or decreament manage
    const Guestincrement = () => {
        if (selectedGuest < selectedRoom * 4) {
            setselectedGuest(selectedGuest + 1);
        }
    };

    const Guestdecrement = () => {
        if (selectedGuest > 1) {
            setselectedGuest(selectedGuest - 1);
        }
    };

    const Roomincrement = () => {
        if (selectedRoom < 7) {
            setselectedRoom(selectedRoom + 1);
        }
    };

    const Roomdecrement = () => {
        // Ensure there's at least one room
        if (selectedRoom > 1) {
            // Calculate the number of guests for the new room count
            const newGuestCount = (selectedRoom - 1) * 4;

            if (selectedGuest > newGuestCount) {
                // Decrease both room count and guest count
                setselectedRoom(selectedRoom - 1);
                setselectedGuest(newGuestCount);
            } else {
                // Decrease room count only
                setselectedRoom(selectedRoom - 1);
            }
        }
    };

    const [priceRange, setPriceRange] = useState([0, 20000]);
    const { roomType, amenities, propertyType } = useAuthContext();
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearchParams = Object.fromEntries(searchParams.entries());

    const { getSearchHotel } = useSearch();

    const HandleLocationUpdate = (e) => {
        setSelectedLocations(e.target.value);
    };

    const [geoLoc, setGeoLoc] = useState({
        longitude: currentSearchParams.lat,
        latitude: currentSearchParams.lng,
    });
    const [selectedLocations, setSelectedLocations] = useState(
        currentSearchParams.location
    );
    const { checkInCheckOut, setCheckInCheckOut } = useCollections();

    const [selectedGuest, setselectedGuest] = useState(
        parseInt(currentSearchParams.totalGuest)
    );
    const [selectedRoom, setselectedRoom] = useState(
        parseInt(currentSearchParams.totalRooms)
    );

    // -------------------------- MOdal controllers-----------------------------
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const autoCompleteRef = useRef();
    const inputRef = useRef();

    // update the location search query
    const HandleUpdateLocationQuery = async (
        location,
        checkIn,
        checkOut,
        totalRooms,
        totalGuests,
        lng,
        lat
    ) => {
        const data = await {
            location: location,
            checkIn: convertDatesToUTC(checkInCheckOut)[0],
            checkOut: convertDatesToUTC(checkInCheckOut)[1],
            totalRooms: totalRooms,
            totalGuest: totalGuests,
            lng: lng,
            lat: lat,
        };
        await updateSearchQuery(data);
        await getSearchHotel(searchParams);
    };

    useEffect(() => {
        try {
            const options = {
                types: ["geocode"],
                componentRestrictions: { country: "in" },
                fields: ["formatted_address", "geometry"],
            };

            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                options
            );

            autoCompleteRef.current.addListener("place_changed", () => {
                const place = autoCompleteRef.current.getPlace();
                setSelectedLocations(place.formatted_address);
                // Get latitude and longitude
                const { lat, lng } = place.geometry.location;
                let longitude = lng();
                let latitude = lat();
                setGeoLoc({ longitude: longitude, latitude: latitude });
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="d-flex align-items-center flex-column justify-content-between">
            {/* <h6 className="text-left">Locations</h6> */}
            <input
                type="text"
                ref={inputRef}
                value={selectedLocations || ""}
                onChange={HandleLocationUpdate}
            />
            <hr />
            {/* -------------------------------------------------- */}
            <MobileDate
                setCheckInCheckOut={setCheckInCheckOut}
                checkInCheckOut={checkInCheckOut}
                name={"Check-in Check-out"}
            />
            <div onClick={openModal} className="w-100">
                <label style={Stylelabel} className="labelfordatepicker">
                    Rooms and guests
                </label>
                <p style={{ marginTop: "14px" }}>
                    {selectedGuest} Guests, {selectedRoom} Room
                </p>
                <hr style={{ marginTop: "11px", color: "black" }} />
            </div>
            {/* ---------------------- Modal to select the room and guest ---------------------- */}
            <GlobalModal
                isOpen={isModalOpen}
                onClose={closeModal}
                height={"fit-content"}
                width={'100%'}
            >
                <div className="text-center d-flex justify-content-center flex-column">
                    <div className="d-flex justify-content-evenly align-items-center px-5">
                        <h5>Guest</h5>
                        <div className="w-100">
                            <div className="d-flex gap-2 justify-content-center">
                                <button
                                    onClick={Guestdecrement}
                                    className="ButtonSecondary"
                                >
                                    -
                                </button>
                                &nbsp;{selectedGuest}&nbsp;
                                <button
                                    onClick={Guestincrement}
                                    className="ButtonSecondary"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-evenly align-items-center py-2 px-5">
                        <h5>Room</h5>
                        <div className="w-100">
                            <div className="d-flex gap-2 justify-content-center">
                                <button onClick={Roomdecrement} className="ButtonSecondary">
                                    -
                                </button>
                                &nbsp;{selectedRoom}&nbsp;
                                <button onClick={Roomincrement} className="ButtonSecondary">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="ButtonPrimary" onClick={closeModal} fullWidth>
                        Done
                    </button>
                </div>
            </GlobalModal>
            {/* ------------------------ Global modal ends ------------------------------ */}
            <hr />
            <LoadingButton
                fullWidth
                onClick={() =>
                    HandleUpdateLocationQuery(
                        selectedLocations,
                        checkInCheckOut[0],
                        checkInCheckOut[1],
                        selectedRoom,
                        selectedGuest,
                        geoLoc.longitude,
                        geoLoc.latitude
                    )
                }
                style={{ background: "#ee2e24", color: "#fff" }}
            >
                Search
            </LoadingButton>
        </div>
    )
}

export default TravelMobileSearch