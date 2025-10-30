//filter keys
export type FilterKey = 'name' | 'vegetarian'| 'vegan'| 'ingrediantsAmount'| 'coloriesPerServe'|'cookTime'| 'theme'| 'ingredientsTypes'; 

//filter option
export type FilterOption = {
    key: FilterKey;  
    label: String;   
};

//array of filter options
export const FilterOptions: FilterOption []= [
    {key: 'name', label: 'Name'},
    {key: 'vegetarian', label: 'Vegetarian'},
    {key: 'vegan', label: 'Vegan'},
    {key: 'ingrediantsAmount', label: 'Ingrediants Amount'},
    {key: 'coloriesPerServe', label: 'Colories Per Serve'},
    {key: 'cookTime', label: 'Cook Time'},
    {key: 'theme', label: 'Theme'},
    {key: 'ingredientsTypes', label: 'Ingredients Types'}
]