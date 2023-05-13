import { useContext, useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData} from '../redux/slices/pizzaSlice';

const Home = () => {
  const { items, status } = useSelector(selectPizzaData);
  const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeCategory = (id) => dispatch(setCategoryId(id));
  const onChangePage = (number) => dispatch(setCurrentPage(number));

  const getPizzas = async () => {
    const category = categoryId > 0 ? categoryId : '';
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    //const search = searchValue ? searchValue : ''; // search for mockapi but is not working

    dispatch(fetchPizzas({ category, order, sortBy, currentPage }));
    window.scrollTo(0, 0);
  };

  //if we changed one is parameter
  useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage,
      };
      const queryString = qs.stringify(params, {
        skipNulls: true,
      });
      navigate(`/?${queryString}`);
    }
    if (!window.location.search) {
      fetchPizzas();
    }
  }, [categoryId, sort.sortProperty, currentPage]);
  //if have rendered, we try to control URL parametres and save
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // if happened first render so we get response(pizzas)
  useEffect(() => {
    getPizzas();
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items
    .filter((item) => {
      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => (
      <PizzaBlock
        key={obj.id}
        {...obj} //spread operator
      />
    ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка ...</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
