import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('Home', () => {
  it('renders home page heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Home Page/i,
    })

    expect(heading).toBeInTheDocument()

  })
})