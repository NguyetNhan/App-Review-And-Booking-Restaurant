import { connect } from 'react-redux';
import Component from '../components/suggestions';
import {
        onFetchNearbyLocationPlace,
        onResetPropsMessageSuggestion,
        onResetPropsSuggestion,
        onFetchPlaceTheBest,
        onFetchFoodTheBest
} from '../actions';
const mapStateToProps = (state) => {
        const suggestionsReducers = state.HomeReducers.SuggestionsReducers;
        if (suggestionsReducers !== null) {
                if (suggestionsReducers.fetchListPlaceSucceeded !== undefined) {
                        if (suggestionsReducers.fetchListPlaceSucceeded.data.length > 6) {
                                var list = [];
                                for (let i = 0; i < 6; i++) {
                                        list.push(suggestionsReducers.fetchListPlaceSucceeded.data[i]);
                                }
                                return {
                                        listPlaceByLocation: list,
                                        isLoading: false
                                };
                        } else {
                                return {
                                        listPlaceByLocation: suggestionsReducers.fetchListPlaceSucceeded.data,
                                        isLoading: false
                                };
                        }
                } else if (suggestionsReducers.fetchListPlaceFailed !== undefined) {
                        return {
                                message: suggestionsReducers.fetchListPlaceFailed.message,
                                isLoading: false
                        };
                } else if (suggestionsReducers.fetchListPlaceTheBestFailed !== undefined) {
                        return {
                                message: suggestionsReducers.fetchListPlaceTheBestFailed.message,
                                isLoading: false
                        };
                } else if (suggestionsReducers.fetchListPlaceTheBestSucceeded !== undefined) {
                        if (suggestionsReducers.fetchListPlaceTheBestSucceeded.data.length > 6) {
                                let list = [];
                                for (let i = 0; i < 6; i++) {
                                        list.push(suggestionsReducers.fetchListPlaceTheBestSucceeded.data[i]);
                                }
                                return {
                                        listPlaceTheBest: list,
                                        isLoading: false
                                };
                        } else {
                                return {
                                        listPlaceTheBest: suggestionsReducers.fetchListPlaceTheBestSucceeded.data,
                                        isLoading: false
                                };
                        }
                } else if (suggestionsReducers.resetProps !== undefined) {
                        return suggestionsReducers.resetProps;
                } else if (suggestionsReducers.resetPropsMessage !== undefined) {
                        return suggestionsReducers.resetPropsMessage;
                } else if (suggestionsReducers.fetchListFoodTheBestFailed !== undefined) {
                        return {
                                message: suggestionsReducers.fetchListFoodTheBestFailed.message,
                                isLoading: false
                        };
                } else if (suggestionsReducers.fetchListFoodTheBestSucceeded !== undefined) {
                        if (suggestionsReducers.fetchListFoodTheBestSucceeded.data.length > 6) {
                                let list = [];
                                for (let i = 0; i < 6; i++) {
                                        list.push(suggestionsReducers.fetchListFoodTheBestSucceeded.data[i]);
                                }
                                return {
                                        listFoodTheBest: list,
                                        isLoading: false
                                };
                        } else {
                                return {
                                        listFoodTheBest: suggestionsReducers.fetchListFoodTheBestSucceeded.data,
                                        isLoading: false
                                };
                        }
                }
        } else
                return {

                };
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchNearbyLocationPlace: (geolocation) => {
                        dispatch(onFetchNearbyLocationPlace(geolocation));
                },
                onResetPropsSuggestion: () => {
                        dispatch(onResetPropsSuggestion());
                },
                onResetPropsMessageSuggestion: () => {
                        dispatch(onResetPropsMessageSuggestion());
                },
                onFetchPlaceTheBest: (page) => {
                        dispatch(onFetchPlaceTheBest(page));
                },
                onFetchFoodTheBest: (page) => {
                        dispatch(onFetchFoodTheBest(page));
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);