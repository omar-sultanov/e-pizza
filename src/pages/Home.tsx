import { useCallback, useContext, useEffect, useRef } from 'react';
import qs from 'qs';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';
import { useNavigate } from 'react-router-dom';
import { sortList, Sort, PizzaBlock, Categories, Pagination } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slice';
import { selectPizzaData } from '../redux/pizza/selectors';
import { IPizza, ISearchParams } from '@models/Pizza';
import { useAppDispatch } from 'redux/store';
import { IPizzaBlockProp } from '@models/PizzaBlock';
import { fetchPizzas } from 'redux/pizza/asyncAction';
import { selectFilter } from 'redux/filter/selectors';
import { Skeleton } from 'components/PizzaBlock/Skeleton';


const Home: React.FC = () => {
  const { items, status } = useSelector(selectPizzaData);
  const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChangeCategory = useCallback((id: number) => dispatch(setCategoryId(id)),[]);
  const onChangePage = (page: number) => dispatch(setCurrentPage(page));

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category = ${categoryId}` : '';
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    //const search = searchValue ? searchValue : ''; // search for mockapi but is not working

    dispatch(
      fetchPizzas({ sortBy, order, category, currentPage: String(currentPage) }));
    window.scrollTo(0, 0);
  };

  //if we changed one is parameter
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };
  //     const queryString = qs.stringify(params, {
  //       skipNulls: true,
  //     });
  //     navigate(`/?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as ISearchParams));
  //   }
  // }, [categoryId, sort.sortProperty, currentPage]);


  //if have rendered, we try to control URL parametres and save
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as ISearchParams;
  //     const sort = sortList.find(
  //       (obj) => obj.sortProperty === params.sortBy,
  //     );
  //     dispatch(setFilters({
  //     sort:sort ||sortList[0],
  //     searchValue,
  //       categoryId: Number(params.category),
  //       currentPage:Number(params.currentPage)
  //      }));
  //     isSearch.current = true;
  //   }
  // }, []);

  // if happened first render so we get response(pizzas)
  useEffect(() => {
    getPizzas();
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items
    .filter((item: IPizza) => {
      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: IPizzaBlockProp) => (
      <PizzaBlock {...obj} key={obj.id} />
      //spread operator
    ));

   
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sortValue={sort}/>
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
