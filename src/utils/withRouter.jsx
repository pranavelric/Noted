import { useLocation,useParams,useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
      {...props}
      navigate={ navigate } location={ location } params={ params }
       
        />
    );
  };
  
  return Wrapper;
};