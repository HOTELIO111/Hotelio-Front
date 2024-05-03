import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import SideFilter from '../HotelsResults/SideFilter'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import HotelList from '../HotelsResults/HotelList';
import { GetAlltheRoomTypes } from '../../store/actions/roomCategoriesAction';
import { API_URL } from '../../config';
import axios from "axios";
import TravelHeader from '../../Components/Travel Partner Components/TravelHeader';

const TravelHotels = () => {
    const searchParams = new URLSearchParams(document.location.search);

    const { data } = useSelector((state) => state.GetSearchedHotelsReducers);

    const [filterData, setFilterData] = useState({});
    const [searchQuery, setSearchQuery] = useSearchParams();
    const params = new URLSearchParams(searchQuery.toString());
    // getall the query in the object
    const currentSearchParams = Object.fromEntries(searchParams.entries());

    const location = useLocation();

    const [hotels, setHotels] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState(1);

    // to setthe price

    // Hotel PriceManagement
    const PriceManagement = (hotelData) => {
        const report = {};
        hotelData?.rooms?.forEach((element) => {
            report[element?.roomType?._id] = {
                price: element?.price,
                title: element?.roomType?.title,
            };
        });
        const result = {};
        if (currentSearchParams.roomType !== undefined) {
            const newData = {
                price: report[currentSearchParams.roomType]?.price,
                title: report[currentSearchParams.roomType]?.title,
            };
            Object.assign(result, newData);
        } else {
            const roomListPriceList = Object.values(report);
            const minPrice = roomListPriceList.sort((a, b) => a?.price - b?.price);
            Object.assign(result, minPrice[0]);
        }
        return result;
    };

    const paginationManage = (count) => {
        let paginationCount;
        const countValue = count / 5;
        if (Math.abs(Math.round(countValue) - countValue) > 0.5) {
            paginationCount = Math.round(countValue) + 1;
        } else {
            paginationCount = Math.round(countValue);
        }
        return paginationCount;
    };

    // filter the hotel data as per the page and pagesize
    const FilterhotelsData = (data, pagination) => {
        const length = data.length;
        setHotels(data);
    };

    // to make the api call on the change of the query ------------------------------------------
    useEffect(() => {
        let timeoutId;

        const getSearchHotel = async () => {
            try {
                setLoader(true);
                const decodedUriComponent = decodeURIComponent(params);
                const response = await axios.get(
                    `${API_URL}/hotel/search-it?${decodedUriComponent}`
                );
                if (response.status === 200) {
                    // setHotels(response.data.data);
                    setTotalPages(response?.data?.data[0]?.pagination[0]?.counts);
                    FilterhotelsData(response.data?.data[0]?.data, pagination);
                    window.localStorage.setItem(
                        "search",
                        encodeURIComponent(decodedUriComponent)
                    );
                    setLoader(false);
                }
            } catch (error) {
                console.error(error);
            }
        };
        const debounceApiCall = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(getSearchHotel, 500);
        };
        debounceApiCall();
        return () => clearTimeout(timeoutId);
    }, [location.search]);

    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate(-1); // Navigate to the desired route without a page reload
    };

    React.useEffect(() => {
        const popstateListener = (e) => {
            if (e.type === "popstate") {
                handleBackButton();
            }
        };

        window.addEventListener("popstate", popstateListener);

        return () => {
            window.removeEventListener("popstate", popstateListener);
        };
    }, [navigate]);

    React.useEffect(() => {
        dispatch(GetAlltheRoomTypes());
    }, []);

    return (
        <Box>
            <TravelHeader />
            <Grid container >
                <Grid item xs={2.5}>
                    <SideFilter
                        hotels={hotels}
                        setFilterData={setFilterData}
                        filterData={filterData}
                    />
                </Grid>
                <Grid item xs={9.5}>
                    <HotelList
                        hotels={hotels}
                        pagination={pagination}
                        totalPages={totalPages}
                        setPagination={setPagination}
                        loader={loader}
                        location={searchParams.get("location")}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default TravelHotels