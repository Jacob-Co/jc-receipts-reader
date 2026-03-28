package smi

import "testing"

func TestPerimeter(t *testing.T) {
	t.Run("return perimeter of rectangle given width and height", func(t *testing.T) {
		rectangle := Rectangle{10.0, 10.0}
		got := rectangle.Perimeter()
		want := 40.0

		if got != want {
			t.Errorf("got %v, want %v", got, want)
		}
	})
}

func TestArea(t *testing.T) {
	areaTests := []struct {
		Name  string
		Shape Shape
		Want  float64
	}{
		{Name: "Rectangle", Shape: Rectangle{20.0, 10.0}, Want: 200.0},
		{Name: "Circle", Shape: Circle{10.0}, Want: 314.1592653589793},
	}

	for _, areaTest := range areaTests {
		t.Run(areaTest.Name, func(t *testing.T) {
			got := areaTest.Shape.Area()
			want := areaTest.Want
			if got != want {
				t.Errorf("%#v: got %v, want %v", areaTest.Shape, got, want)
			}
		})
	}
}
