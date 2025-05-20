import axios from 'axios';

export const PER_PAGE = 15;

const unsplashBaseSearchParams = {
  client_id: 'rk3tdFsf8KehH2KGmsKlrNebJNfpnvPf2Gw_Ic3t1yw',
  per_page: PER_PAGE,
};

export async function loadImages(searchQuery, page) {
  const searchParams = new URLSearchParams(unsplashBaseSearchParams);
  searchParams.append('query', searchQuery);
  searchParams.append('page', page);

  const url = `https://api.unsplash.com/search/photos?${searchParams}`;
  const response = await axios.get(url);
  return {
    images: response.data.results,
    totalImageCount: response.data.total,
  };
}
