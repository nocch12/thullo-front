import { VFC, PropsWithChildren, useState, useCallback } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Text,
  PopoverArrow,
  PopoverCloseButton,
  Image,
  SimpleGrid,
  useBoolean,
  Spacer,
  Box,
} from '@chakra-ui/react';
import SearchInput from '../forms/SearchInput';
import { searchImage as searchImageAPI, TPixabayImage } from '../../api/image';

type Props = {
  onSelectImage: (url: string) => void;
};

const SearchImage: VFC<PropsWithChildren<Props>> = ({ onSelectImage, children }) => {
  const [images, setImages] = useState<TPixabayImage[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searching, setSearching] = useBoolean();

  const handleClose = () => {
    console.log('SearchImage Closed.');
  };

  const onSearch = async (value: string) => {
    setSearching.on();
    const res = await searchImageAPI(value);
    setImages(res.data.hits.slice(0, 12));
    setSearching.off();
  };

  return (
    <Popover onClose={handleClose}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Cover</PopoverHeader>
        <PopoverBody>
          <Text mb="2">Unsplashから画像を検索</Text>
          <SearchInput value={searchInput} onChange={setSearchInput} onSearch={onSearch} />
          <Spacer mb="2" />
          {searching ? (
            '検索中...'
          ) : (
            <SimpleGrid columns={4} spacing="2">
              {images.map((image, i) => (
                <Box
                  as="button"
                  w="16"
                  h="16"
                  rounded="md"
                  overflow="hidden"
                  onClick={() => onSelectImage(image.largeImageURL)}
                  key={image.previewURL}
                >
                  <Image
                    src={image.previewURL}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchImage;
