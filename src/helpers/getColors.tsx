import ImageColors from "react-native-image-colors";
import { AndroidImageColors, IOSImageColors } from 'react-native-image-colors/lib/typescript/types';

export const getImageColors = async (uri: string) => {
    // const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const colors: AndroidImageColors | IOSImageColors = await ImageColors.getColors(uri, {
        fallback: "#228B22",
    });

    let primary;
    let secondary;

    if (colors.platform === "android") {
        // Access android properties
        // e.g.
        primary = colors.dominant;
        secondary = colors.average;
    } else {
        // Access iOS properties
        // e.g.
        primary = colors.primary;
        secondary = colors.secondary;
    }

    return [primary, secondary]
}
