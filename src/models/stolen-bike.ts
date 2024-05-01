class StolenBike {
  id: number;
  title: string;
  description: string;
  theftDate: Date;
  reportDate: Date | null;
  location: string;
  pictureUrl?: string;
  thumb?: string;

  constructor(
    id: number,
    title: string,
    description: string,
    theftDate: Date,
    reportDate: Date | null,
    location: string,
    pictureUrl?: string,
    thumb?: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.theftDate = theftDate;
    this.reportDate = reportDate;
    this.location = location;
    this.pictureUrl = pictureUrl;
    this.thumb = thumb;
  }
}

export default StolenBike;
