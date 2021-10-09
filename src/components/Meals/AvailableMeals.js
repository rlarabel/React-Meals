import {useEffect, useState} from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  
  //Use fetech meails because use effect can not return a promise / be async
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-projet-6-http-default-rtdb.firebaseio.com/meals.json');
      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const responseData = await response.json();
      
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,        
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // Can so this because it is a promise
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  
  if (isLoading) {
    return (
      <section className={styles["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
      <MealItem
          id={meal.id} 
          key={meal.id} 
          name={meal.name} 
          description={meal.description} 
          price={meal.price}
      />
  ));
  return (
      <section className={styles.meals}>
          <Card>
              <ul>
                  {mealsList}
              </ul>
          </Card>
      </section>
  )
};

export default AvailableMeals;