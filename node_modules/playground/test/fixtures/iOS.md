# UIColorBlender

Use Swift operator overloading to blend two UIColors with the addition operator:

```swift
import UIKit

@infix func + (left: UIColor, right: UIColor) -> UIColor {
    var leftRGBA = CGFloat[](count: 4, repeatedValue: 0.0)
    var rightRGBA = CGFloat[](count: 4, repeatedValue: 0.0)

    left.getRed(&leftRGBA[0], green: &leftRGBA[1], blue: &leftRGBA[2], alpha: &leftRGBA[3])
    right.getRed(&rightRGBA[0], green: &rightRGBA[1], blue: &rightRGBA[2], alpha: &rightRGBA[3])

    return UIColor(
        red: (leftRGBA[0] + rightRGBA[0]) / 2,
        green: (leftRGBA[1] + rightRGBA[1]) / 2,
        blue: (leftRGBA[2] + rightRGBA[2]) / 2,
        alpha: (leftRGBA[3] + rightRGBA[3]) / 2
    )
}

UIColor.yellowColor() + UIColor.redColor()
UIColor.greenColor() + UIColor.blueColor()
UIColor.purpleColor() + UIColor.orangeColor()
```

[Source](https://gist.github.com/jas/d26de56c47d320567b19)
