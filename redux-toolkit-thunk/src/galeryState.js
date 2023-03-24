import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPhotos = createAsyncThunk(
    'photos/getPhotos',
    async (page = 1) => {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=9`);
        const formattedResponse = await response.json();
        return {
            formattedResponse,
            page
        };
    }
);

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        photos: [],
        page: 0,
        isLoading: false,
    },
    extraReducers: {
        [getPhotos.pending]: (state) => {
            state.isLoading = true;
        },
        [getPhotos.fulfilled]: (state, action) => {
            state.photos = [
                ...state.photos,
                ...action.payload.formattedResponse
            ];
            state.page = action.payload.page;
            state.isLoading = false;
        },
        [getPhotos.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export default gallerySlice.reducer;