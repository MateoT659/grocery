//filter keys
export type FilterKey = 'name' | 'vegetarian'| 'vegan'| 'ingredientsAmount'| 'caloriesPerServe'|'cookTime'| 'theme'| 'ingredientsTypes'; 

//filter option
export type FilterOption = {
    key: FilterKey;  
    label: string;   
};

//array of filter options
export const FilterOptionsArray: FilterOption []= [
    {key: 'name', label: 'Name'},
    {key: 'vegetarian', label: 'Vegetarian'},
    {key: 'vegan', label: 'Vegan'},
    {key: 'ingredientsAmount', label: 'Ingredients Amount'},
    {key: 'caloriesPerServe', label: 'Calories Per Serve'},
    {key: 'cookTime', label: 'Cook Time'},
    {key: 'theme', label: 'Theme'},
    {key: 'ingredientsTypes', label: 'Ingredients Types'}
]