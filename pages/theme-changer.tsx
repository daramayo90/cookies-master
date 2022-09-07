import { ChangeEvent, FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import Cookies from 'js-cookie';
import axios from 'axios';

import { Layout } from '../components/layouts/Layout';

interface Props {
  theme: string;
}

const ThemeChanger: FC<Props> = ({ theme }) => {
  const [currentTeheme, setCurrentTeheme] = useState(theme);

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    setCurrentTeheme(selectedTheme);

    localStorage.setItem('theme', selectedTheme);

    Cookies.set('theme', selectedTheme);
  };

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');

    console.log({ data });
  };

  useEffect(() => {
    console.log('localStorage', localStorage.getItem('theme'));
    console.log('Cookies', Cookies.get('theme'));
  }, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTeheme} onChange={onThemeChange}>
              <FormControlLabel value='light' control={<Radio />} label='Light' />
              <FormControlLabel value='dark' control={<Radio />} label='Dark' />
              <FormControlLabel value='custom' control={<Radio />} label='Custom' />
            </RadioGroup>
          </FormControl>

          <Button onClick={onClick}>Request</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // default values in case there aren't 'theme' or 'name' keys stored in cookies = 'light' / 'No name'
  const { theme = 'light', name = 'No name' } = req.cookies;

  const validThemes = ['light', 'dark', 'custom'];

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
      name,
    },
  };
};

export default ThemeChanger;
