export class YelpRestaurantParser {
  constructor(restaurant) {
    this.restaurant = restaurant;
  }
  
  name() {
    return this.restaurant.name;
  }
  
  id() {
    return this.restaurant.id;
  }
  
  url() {
    return this.restaurant.url;
  }
  
  imageUrl() {
    return convertYelpImageResolution(this.restaurant.image_url, "ms");
  }
  
  distance() {
    return getMilesFromMeters(this.restaurant.distance).toFixed(2);
  }
  
  displayAddress1() {
    return this.restaurant.location.display_address[0];
  }
  
  displayAddress2() {
    return this.restaurant.location.display_address[1];
  }
}

function getMilesFromMeters(i) {
  return i*0.000621371192;
}

function convertYelpImageResolution(yelpImageUrl, newResolution) {
  const supportedYelpImageResolutions = ['o', 'l', 'm', 'ms', 's', 'ss'] //https://www.yelp.com/developers/faq
  
  if (supportedYelpImageResolutions.includes(newResolution)) {
    return yelpImageUrl.replace(/.\.jpg/, `${newResolution}.jpg`);
  } else {
    throw `Yelp does not support image resolution: ${newResolution}`
  }
}