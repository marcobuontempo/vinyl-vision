import ErrorDisplay from "../../components/features/ErrorDisplay";

type Props = {};

const NotFound = ({}: Props) => {
  return (
    <ErrorDisplay
      number={404}
      message="Not Found"
      information="Could not find the specified page"
    />
  );
};

export default NotFound;
