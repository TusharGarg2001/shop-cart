import { ADD_TO_CART, REMOVE_FROM_CART } from '../action/cartActions';

const initialState = {
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case REMOVE_FROM_CART: {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index >= 0) {
        const newItems = [...state.items];
        newItems.splice(index, 1);
        return {
          ...state,
          items: newItems
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default cartReducer;


  