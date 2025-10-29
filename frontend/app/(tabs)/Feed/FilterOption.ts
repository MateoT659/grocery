//filter keys
export type FilterKey = 'name' | 'vegetarian'| 'vegan'| 'ingrediantsAmount'| 'coloriesPerServe'|'cookTime'| 'theme'| 'ingredientsTypes'; 

//filter option
export type FilterOption = {
    key: FilterKey;  
    lebal: String;   
};

//array of filter options
export const FilterOptions: FilterOption []= [
    {key: 'name', lebal: 'Name'},
    {key: 'vegetarian', lebal: 'Vegetarian'},
    {key: 'vegan', lebal: 'Vegan'},
    {key: 'ingrediantsAmount', lebal: 'Ingrediants Amount'},
    {key: 'coloriesPerServe', lebal: 'Colories Per Serve'},
    {key: 'cookTime', lebal: 'Cook Time'},
    {key: 'theme', lebal: 'Theme'},
    {key: 'ingredientsTypes', lebal: 'Ingredients Types'}
]