import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IntroductionView from "../Introduction/IntroductionView";
import CurrentWeatherView from "../CurrentWeatherView/CurrentWeatherView";
import ForecastView from "../ForecastView/ForecastView";
import HistoryView from "../HistoryView/HistoryView";
import { ReactElement } from "react";

const router = createBrowserRouter([
    {
        path: '/',
        element: (<IntroductionView/>)
    },
    {
        path: '/current',
        element: (<CurrentWeatherView/>)
    },
    {
        path: '/forecast',
        element: (<ForecastView/>)
    },
    {
        path: '/history',
        element: (<HistoryView/>)
    },
])

export const AppRouter = (): ReactElement => {
    return <RouterProvider router={router} />
}