import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-help.component.html',
  styleUrls: ['./book-help.component.css']
})
export class BookHelpComponent {

  constructor(private router: Router) {}

  helps = [
    { type: 'Plumber', image: 'https://www.edgeip.com/images/FCK/Image/202307/SFG-HowtoBecome-Plumber.jpg' },
    { type: 'Cook', image: 'https://www.bluestarcooking.com/wp-content/uploads/2017/03/Blog-Wok-Top-10-022023.jpg' },
    { type: 'Electrician', image: 'https://5.imimg.com/data5/SELLER/Default/2023/12/368766802/UR/WD/KY/95682763/electrician-work-services.jpeg' },
    { type: 'Cleaner', image: 'https://media.istockphoto.com/id/1363376674/photo/smiling-beautiful-asian-woman-washes-the-floor-with-a-yellow-rag-and-detergent.jpg?s=612x612&w=0&k=20&c=sl0Z72xAfCoWZbYWmkcbgFaF4nB6oZFVxkaMDVOivdk=' },
    { type: 'Mechanic', image: 'https://us.images.westend61.de/0000575741pw/mechanic-working-in-engine-room-on-a-ship-ZEF005476.jpg' },
    { type: 'Carpenter', image: 'https://www.perfettotech.ae/wp-content/uploads/2024/02/MicrosoftTeams-image-100.jpg' },
    { type: 'Painter', image: 'https://media.istockphoto.com/id/938085736/photo/workamn-painting-wall-indoors.jpg?s=612x612&w=0&k=20&c=wW_LTcleg_2L21j8FTRMxFMwzMamIYjRAyRgQyjEjyc=' },
    { type: 'Babysitter', image: 'https://fortune.com/img-assets/wp-content/uploads/2022/07/Babysitter-Hybrid-Work-GettyImages-1028379220.jpg' },
    { type: 'Ironing Clothes', image: 'https://fcdrycleaners.com/wp-content/uploads/2024/02/Mastering-The-Art-Of-Ironing_-How-to-Iron-Clothes-998x570.jpg' },
    { type: 'Laundry Service', image: 'https://clutchcitylaundry.com/wp-content/uploads/2023/09/how-does-self-service-laundry-work-4.jpg' },
    { type: 'Dish Washing', image: 'https://www.stateindustrial.com/wp-content/uploads/images/uploaded/Dishwasher%20Washing%20Dishes.jpg' },
    { type: 'House Cleaning', image: 'https://homepluscleaning.com/media/images/How-Does-an-Emergency-House-Cleaning-Work-980x646.jpg' },
    { type: 'Gardening', image: 'https://media.istockphoto.com/id/1166203849/photo/garden-worker-trimming-plants.jpg?s=612x612&w=0&k=20&c=tugEqkOzdA8y35diz6ngfz4BwXx_KRPVegFLgvaUHmw=' },
    { type: 'Elder Care', image: 'https://www.shutterstock.com/image-photo/rear-view-female-nurse-supporting-260nw-2581071769.jpg' },
    { type: 'Grocery Assistance', image: 'https://media.istockphoto.com/id/1414490312/photo/happy-woman-talking-to-supermarket-worker-while-buying-groceries.jpg?s=612x612&w=0&k=20&c=GjKHRczW9umHDpD89TPuQl_Zm8tpvCx5TP7t0RFGmWA=' },
    { type: 'Water Tank Cleaning', image: 'https://www.bluestarenviroservices.in/wp-content/uploads/2022/12/water-tank-cleaning.jpg' }
  ];

  bookHelp(type: string) {
    this.router.navigate(['/book-work', type]);
  }


  goBack() {
    this.router.navigate(['/']);
  }
}
