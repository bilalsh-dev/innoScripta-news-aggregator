// import { createSlice } from "@reduxjs/toolkit";
// import { fetchGuardianArticlesThunk } from "./guardianThunks";
// import { Article } from "@/store/slices/newsSlice";

// interface GuardianState {
//   articles: Article[];
//   currentPage: number;
//   totalPages: number;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: GuardianState = {
//   articles: [],
//   currentPage: 1,
//   totalPages: 0,
//   loading: false,
//   error: null,
// };

// const guardianSlice = createSlice({
//   name: "guardian",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGuardianArticlesThunk.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchGuardianArticlesThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.articles = [...state.articles, ...action.payload.articles];
//         state.totalPages = action.payload.totalPages;
//       })
//       .addCase(fetchGuardianArticlesThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch data";
//       });
//   },
// });

// export default guardianSlice.reducer;
