import { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import { getTeamNews } from '../../api/nbaNewsService';
import ArticleList from '../../components/ArticleList/ArticleList';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getUser } from '../../api/userService';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../store/actions/userActions';

const HomePage = () => {
    const dispatch = useDispatch();
    const { affiliation, firstName } = useSelector(state => state.user);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (affiliation.team && affiliation.team !== '') {

            const retrieveTeamArticles = async () => {

                try {
                    const teamArticlesFromApi = await getTeamNews(affiliation.team);
                    setArticles(teamArticlesFromApi);
                } catch (e) {
                    console.log('error', e)
                }
            };
            retrieveTeamArticles();
        }
    }, [affiliation.team])

    useEffect(() => {
        if (!firstName) {
            const getUserInfo = async () => {
                const info = await getUser();
                dispatch(updateUserData(info));
            }
            getUserInfo()
        }
    }, [dispatch, firstName])


    return (
        <>
            <ArticleList articles={articles} />
            {/* <Table /> */}
        </>
    );
}

export default HomePage;
