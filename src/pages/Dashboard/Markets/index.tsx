import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MarketState } from '../../../interfaces/market';
import { IRoute } from '../../../interfaces/route';
import { AppDispatch, RootState } from '../../../store';
import { getMarkets } from '../../../store/market';

const Markets = () => {
  const marketsState = useSelector<RootState, MarketState>((state) => state.market);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getMarkets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="mb-10">
        <h1 className="font-bold text-4xl">Markets</h1>
        <Link to={IRoute.addMarket} className="text-blue-600">Add a new market</Link>
      </div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-1/3 px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {marketsState.markets.map((market, index) => (
            <tr key={market.id} className={(index + 1) % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border px-4 py-2">{market.name}</td>
              <td className="border px-4 py-2">{market.category}</td>
              <td className="border px-4 py-2">{market.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Markets;
