using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<List<Activity>> { }
    public class Handler : IRequestHandler<Query, List<Activity>>
    {
      private readonly DataContext _contect;
      public Handler(DataContext contect)
      {
        _contect = contect;
      }

      public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
      {
        return await _contect.Activities.ToListAsync();
      }
    }
  }
}