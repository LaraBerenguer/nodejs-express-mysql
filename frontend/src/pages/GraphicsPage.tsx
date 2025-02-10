import AllCharts from '../components/Charts/AllCharts';

const GraphicsPage = () => {
    return (
        <>
            <div className='graphics-page-charts'>
                <AllCharts />
            </div>
            <div className="graphics-page-text prose mt-20 text-start w-full">
                <h3>Want more statistics?</h3>
                <p>The more people join, the more info you'll have. Check again soon!</p>
            </div>
        </>

    );
};

export default GraphicsPage;