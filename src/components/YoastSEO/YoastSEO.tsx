import React, {FunctionComponent, useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ScoreNotification from "@/components/YoastSEO/components/ScoreNotification/ScoreNotification";
import ScorePanel from "@/components/YoastSEO/components/ScorePanel/ScorePanel";
import {Card, CardContent, CardHeader,} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  preview: {
    marginBottom: theme.spacing(2)
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface YoastSEOProps {
  className?: string;
  title: string;
  description: string;
  slug: string;
  permalink: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
}

const YoastSEO: FunctionComponent<YoastSEOProps> = (props: YoastSEOProps) => {
  const {className, title, description, slug, permalink, seoTitle, seoDescription, focusKeyword, ...rest} = props;
  const classes = useStyles();
  const [badContentReadability, setBadContentReadability] = useState([]);
  const [improveContentReadability, setImproveContentReadability] = useState([]);
  const [goodContentReadability, setGoodContentReadability] = useState([]);
  const [badSEOResults, setBadSEOResults] = useState([]);
  const [improveSEOResults, setImproveSEOResults] = useState([]);
  const [goodSEOResults, setGoodSEOResults] = useState([]);

  useEffect(() => {
    analyzeSEO(title, description, focusKeyword, seoDescription, seoTitle, slug, permalink);
  }, [title, description, focusKeyword, seoDescription, seoTitle, slug, permalink]);

  const analyzeSEO = (title: string, descriptionText: string, keyword: string, seoDescription: string, seoTitle: string, url: string, permalink: string) => {
    let attributes = {
      keyword: keyword ? keyword : "",
      description: seoDescription ? seoDescription : "",
      title: title ? title : "",
      titleWidth: seoTitle ? seoTitle.split(" ").length : title.split(" ").length,
      url: url ? url : "",
      permalink: permalink ? permalink : "",
      locale: "vi_VN"
    };
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title={<Typography variant={"h6"} children={"Điểm SEO"}/>}/>
      <CardContent>
          <Tabs indicatorColor="primary"
                textColor="primary" value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label={"Khả năng dễ đọc"} {...a11yProps(0)} />
            <Tab label={"Từ khoá chính"} {...a11yProps(1)} />
          </Tabs>
        <TabPanel value={value} index={0}>
          <ScoreNotification numImprovements={improveContentReadability.length} numProblems={badContentReadability.length}/>
          <ScorePanel goodResults={goodContentReadability} improvementResults={improveContentReadability} badResults={badContentReadability}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ScoreNotification numImprovements={improveSEOResults.length} numProblems={badSEOResults.length}/>
          <ScorePanel goodResults={goodSEOResults} improvementResults={improveSEOResults} badResults={badSEOResults}/>
        </TabPanel>
      </CardContent>
    </Card>
  )
};

export default YoastSEO;
