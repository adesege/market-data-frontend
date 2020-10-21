import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppAlert from '../../../components/app/AppAlert';
import AppButton from '../../../components/app/AppButton';
import AppFlash from '../../../components/app/AppFlash';
import AppLoader from '../../../components/app/AppLoader';
import { IFlashTypes } from '../../../interfaces/flash';
import { ICreateMarket } from '../../../interfaces/market';
import { IRoute } from '../../../interfaces/route';
import { AppDispatch, RootState } from '../../../store';
import { deleteMarket, getMarkets } from '../../../store/market';

interface IDeleteAlertProps {
  market: ICreateMarket;
  onToggleDeleteMessage: (market: ICreateMarket, state: boolean) => void
}

const DeleteAlert = (props: IDeleteAlertProps) => {
  const [isDeletingMarket, setIsDeletingMarket] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = async () => {
    try {
      setIsDeletingMarket(true);
      await dispatch(deleteMarket(props.market.id));
      setIsDeletingMarket(false);

      props.onToggleDeleteMessage(null, false);
    } catch (error) {
      setIsDeletingMarket(false);
    }
  };

  return (
    <div role="alert" className="mb-5">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Danger
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p className="mb-5">
          Are you sure you want to delete
          {' '}
          {props.market.name}
          {' '}
          market? This action cannot be undone.
        </p>
        <AppButton disabled={isDeletingMarket} onClick={onDelete} className="bg-red-700 text-white mr-3">Yes, delete</AppButton>
        <AppButton onClick={() => props.onToggleDeleteMessage(null, false)} className="bg-green-700 text-white">No, cancel</AppButton>
      </div>
    </div>
  );
};

const Markets = () => {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const [selectedMarket, setSelectedMarket] = React.useState<ICreateMarket>();
  const [isLoadingMarkets, setIsLoadingMarkets] = React.useState(true);

  const markets = useSelector<RootState, ICreateMarket[]>((state) => state.market.markets);
  const dispatch = useDispatch<AppDispatch>();

  const onToggleDeleteMessage = (market: ICreateMarket, state: boolean): void => {
    setSelectedMarket(market);
    setShowDeleteAlert(state);
  };

  React.useEffect(() => {
    dispatch(getMarkets()).finally(() => setIsLoadingMarkets(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="mb-10">
        <h1 className="font-bold text-4xl">Markets</h1>
        <Link to={IRoute.addMarket} className="text-blue-600">Add a new market</Link>
      </div>
      <AppFlash className="mb-5" />
      {showDeleteAlert
        && (
          <DeleteAlert
            market={selectedMarket}
            onToggleDeleteMessage={onToggleDeleteMessage}
          />
        )}
      {isLoadingMarkets
        ? <AppLoader />
        : (
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="w-1/3 px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Address</th>
                <th className="w-1/6 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>

              {!markets.length
                && (
                  <tr>
                    <td colSpan={4}>
                      <AppAlert
                        className="text-center"
                        messages={['You haven\'t created any market yet']}
                        type={IFlashTypes.info}
                      />
                    </td>
                  </tr>
                )}
              {!isLoadingMarkets && !!markets.length && markets.map((market, index) => (
                <tr key={market.id} className={(index + 1) % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="border px-4 py-2">{market.name}</td>
                  <td className="border px-4 py-2">{market.category}</td>
                  <td className="border px-4 py-2">{market.address}</td>
                  <td className="border px-4 py-2">
                    <Link
                      to={`${IRoute.market}/${market.id}`}
                      className="bg-blue-600 text-white py-1 px-2 rounded inline-block mr-1"
                    >
                      Edit
                    </Link>
                    <AppButton className="bg-red-700 text-white  py-1 px-2 h-auto" onClick={() => onToggleDeleteMessage(market, true)}>Delete</AppButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </section>
  );
};

export default Markets;
